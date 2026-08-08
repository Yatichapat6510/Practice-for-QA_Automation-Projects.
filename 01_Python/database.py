
# Commands for managing the database

name = "Customer database"


def insert():
    print("Save customer data")


def delete():
    print("Delete customer data")


def update():
    print("Update customer data")


def view():
    print("Show customer data")


def search():
    print("Search customer data")


def help_commands():
    print("Available commands:")
    for command in COMMANDS:
        print(f"- {command}")


COMMANDS = {
    "insert": insert,
    "delete": delete,
    "update": update,
    "view": view,
    "search": search,
    "help": help_commands,
}


def run_command(command):
    normalized_command = command.lower()
    if normalized_command in COMMANDS:
        COMMANDS[normalized_command]()
    else:
        print(f"Unknown command: {command}")

