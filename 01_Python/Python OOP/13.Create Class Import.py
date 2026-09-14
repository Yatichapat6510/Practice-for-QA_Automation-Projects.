

import ast
from pathlib import Path
from typing import Dict, List, Any


def get_python_files(root: Path) -> List[Path]:
    # """คืนรายชื่อไฟล์ .py ทั้งหมดใน root และ subfolder ยกเว้นไฟล์นี้เอง"""
    exclude_name = Path(__file__).resolve().name
    files = []
    for file in sorted(root.rglob("*.py")):
        if file.name == exclude_name:
            continue
        files.append(file)
    return files


def find_top_level_classes(tree: ast.AST) -> List[str]:
    return [node.name for node in tree.body if isinstance(node, ast.ClassDef)]


def find_top_level_functions(tree: ast.AST) -> List[str]:
    return [
        node.name
        for node in tree.body
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef))
    ]


def has_main_guard(tree: ast.AST) -> bool:
    for node in tree.body:
        if isinstance(node, ast.If):
            test = node.test
            if isinstance(test, ast.Compare):
                left = test.left
                if isinstance(left, ast.Name) and left.id == "__name__":
                    if isinstance(test.ops[0], ast.Eq):
                        if isinstance(test.comparators[0], ast.Constant) and test.comparators[0].value == "__main__":
                            return True
            if isinstance(test, ast.Name) and test.id == "__name__":
                pass
    return False


def has_top_level_side_effects(tree: ast.AST) -> bool:
    # """ตรวจว่ามีโค้ดที่ทำงานตอน import หรือไม่ (เช่น top-level call, assign, print)"""
    allowed_nodes = (
        ast.Import,
        ast.ImportFrom,
        ast.ClassDef,
        ast.FunctionDef,
        ast.AsyncFunctionDef,
        ast.Assign,
        ast.AnnAssign,
        ast.Pass,
        ast.Constant,
        ast.Expr,
    )

    for node in tree.body:
        if isinstance(node, ast.If):
            if has_main_guard(tree):
                continue
            return True
        if isinstance(node, ast.Expr):
            # allow docstring expression (string literal) or function call
            if isinstance(node.value, ast.Constant) and isinstance(node.value.value, str):
                continue
            return True
        if not isinstance(node, allowed_nodes):
            return True
    return False


def analyze_file(file_path: Path) -> Dict[str, Any]:
    result: Dict[str, Any] = {
        "file": str(file_path),
        "status": "unknown",
        "classes": [],
        "functions": [],
        "can_import": False,
        "warnings": [],
        "module_name": "",
    }

    try:
        source = file_path.read_text(encoding="utf-8")
        tree = ast.parse(source, filename=str(file_path))
    except Exception as exc:
        result["status"] = "syntax_error"
        result["warnings"].append(f"Syntax error: {exc}")
        return result

    classes = find_top_level_classes(tree)
    functions = find_top_level_functions(tree)
    result["classes"] = classes
    result["functions"] = functions
    result["module_name"] = file_path.stem

    if has_main_guard(tree):
        result["warnings"].append("มี __main__ guard จึงสามารถ import ได้ปลอดภัยกว่า")

    if has_top_level_side_effects(tree):
        result["warnings"].append("มีโค้ดที่ทำงานทันทีตอน import (top-level side effects) - อาจไม่เหมาะสำหรับ import")

    if classes:
        result["can_import"] = True
        result["status"] = "importable"
        return result

    if functions:
        result["status"] = "module_only"
        result["warnings"].append("ไฟล์นี้ไม่มี class แต่มี function ที่สามารถ import ได้")
        result["can_import"] = True
        return result

    result["status"] = "not_importable"
    result["warnings"].append("ไฟล์นี้ไม่มี class/function ที่ expose ให้ import ได้")
    return result


def build_import_examples(file_path: Path, class_names: List[str]) -> List[str]:
    # """สร้างตัวอย่างการเรียก import สำหรับไฟล์และ class ที่พบ"""
    examples = []
    rel = file_path.relative_to(file_path.parents[0])
    module_name = file_path.stem
    if class_names:
        for cls in class_names:
            examples.append(f"from {module_name} import {cls}")
            examples.append(f"obj = {cls}()")
            examples.append("")
    return examples


def print_report(root: Path):
    files = get_python_files(root)
    if not files:
        print(f"ไม่พบไฟล์ .py ใด ๆ ในโฟลเดอร์: {root}")
        return

    print("=" * 80)
    print("รายงานตรวจสอบไฟล์ Python สำหรับ import class")
    print(f"โฟลเดอร์: {root}")
    print("=" * 80)

    all_results = []
    for file in files:
        result = analyze_file(file)
        all_results.append(result)

        print(f"\nไฟล์: {file.name}")
        print(f"  status: {result['status']}")
        print(f"  classes: {result['classes'] if result['classes'] else 'ไม่มี'}")
        print(f"  functions: {result['functions'] if result['functions'] else 'ไม่มี'}")

        if result["warnings"]:
            print("  ข้อควรระวัง:")
            for warn in result["warnings"]:
                print(f"    - {warn}")

        if result["classes"]:
            print("  ตัวอย่าง import:")
            for line in build_import_examples(file, result["classes"]):
                if line:
                    print(f"    {line}")
                else:
                    print()

    print("\n" + "=" * 80)
    print("สรุปกฎการ import")
    print("- ถ้าไฟล์มี class ที่อยู่ระดับ top-level และไม่มีโค้ดรันตอน import จะสามารถ import ได้")
    print("- ถ้ามีโค้ดรันทันทีตอน import เช่น print(), request(), database connect() จะมีความเสี่ยง")
    print("- ถ้าไฟล์ใช้ __main__ guard จะปลอดภัยกว่าเมื่อเรียกผ่าน import")
    print("- หากต้องการนำ class จากไฟล์อื่น ใช้ format ต่อไปนี้:")
    print("  from file_name import ClassName")
    print("  obj = ClassName()")
    print("  หรือถ้าเป็น folder/package:")
    print("  from package.module import ClassName")
    print("=" * 80)


if __name__ == "__main__":
    project_root = Path(__file__).resolve().parent
    print_report(project_root)
