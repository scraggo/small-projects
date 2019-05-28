import sys

# Example input
test_str = '''@test
testing
* [test?](https://example.com)

@hi
hello
hey there

@hi
other stuff

@z

@b
'''

# Expected output:
'''
@b
@hi
@test
@z
'''


def handle_args():
    if len(sys.argv) < 2:
        sys.exit('Expected a filepath. Ex: python <script name> <file path>')


def get_line_list(line_set):
    return list(line_set)


def get_sorted_lines(line_list):
    return sorted(line_list, key=lambda line: line.lower())


def print_lines(header, line_list):
    """Format the result.

    Args:
        header: {string} to lead the data printout.
        line_list: {list} to be printed.
    Returns:
        None
    """
    print(header, '\n')
    print(''.join(line_list), '\n')


def main():
    handle_args()

    in_file = sys.argv[1]
    # lines = test_str.split('\n')

    line_set = set()

    with open(in_file, 'r') as lines:
        print('\nUnsorted:\n')
        for line in lines:
            if line.strip().startswith('@'):
                line_set.add(line)
                print(line, end="")
        print('\n')

    line_list = get_line_list(line_set)
    # print_lines('Unsorted', line_list)
    print_lines('Sorted', get_sorted_lines(line_list))


if __name__ == "__main__":
    main()
