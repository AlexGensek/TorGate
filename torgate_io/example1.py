from torgate_io import *


if __name__ == "__main__":
    print('Send test data to host\n')
    sendMessage(TEST_HOSTNAME, TEST_DATA)
    print('Done\n')