# # Main Program

# import importlib


# def get_callable(module, names, default=None):
#     if module is None:
#         return default
#     for name in names:
#         func = getattr(module, name, None)
#         if callable(func):
#             return func
#     return default


# try:
#     import calculator as calc
# except ImportError:
#     calc = None

# try:
#     import database as db
# except ImportError:
#     db = None


# add = get_callable(calc, ["add", "sum_values", "plus"], lambda a, b: a + b)
# subtract = get_callable(calc, ["subtract", "minus"], lambda a, b: a - b)
# multiply = get_callable(calc, ["multiply", "times"], lambda a, b: a * b)
# divide = get_callable(calc, ["divide", "division"], lambda a, b: a / b if b != 0 else None)

# save_record = get_callable(
#     db,
#     ["save_record", "save_data", "insert_record", "store_data"],
#     lambda payload: print(f"[DB] Saved: {payload}"),
# )


# def run_workflow(a, b):
#     result = {
#         "sum": add(a, b),
#         "difference": subtract(a, b),
#         "product": multiply(a, b),
#         "quotient": divide(a, b),
#     }
#     save_record(result)
#     return result


# if __name__ == "__main__":
#     print(run_workflow(10, 5))



# Main Program

import calculator as calc
import database as db

print(calc.add(10,20))
print(calc.subtract(5,3))
print(calc.power(2,3))

db.search()
print(db.name)
