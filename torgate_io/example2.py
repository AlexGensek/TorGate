from torgate_io import *


if __name__ == "__main__":
    print('Start socket server\n')
    SockServer('localhost', HIDDEN_SERVICE_PORT).handleIncomingConnections()
    print('Socket server started\n')
    while True:
        pass
    # sendMessage(TEST_HOSTNAME, TEST_DATA)