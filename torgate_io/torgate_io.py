from torpy import TorClient
import socket
import threading
import json
import time
import subprocess
import socks


HIDDEN_SERVICE_PORT = 5555

TEST_HOSTNAME = 'k7a2o3ftuipxa4ov.onion'
TEST_DATA = 'test_raz_dva_tri'

RX_TIMEOUT = 2

def sendMessage(hostname, data):
    socks.setdefaultproxy(socks.PROXY_TYPE_SOCKS5, "127.0.0.1", 9050, True)
    s = socks.socksocket()
    s.connect((hostname, 5555))
    print("sendMessage" + data)
    s.sendall(data.encode())
    print("Message %s was sent" % data)
    

class SockServer(object):
    def __init__(self, host, port, callback=None):
        self.client = ''
        self.host = host
        self.port = port
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.sock.bind((self.host, self.port))
        self.callback=callback

    def sendDataToFrontend(self, data):
        print(data)
        if self.callback != None:
            self.callback(data)


    def handleIncomingConnections(self):
        threading.Thread(target = self.listen).start()  

    def listen(self):  #Функция, ожидающая новых подключений
        # self.sock.listen(10)
        while True:
            bashCmd = ["nc", "-l", "-p", "5555"]
            process = subprocess.Popen(bashCmd, stdout=subprocess.PIPE)
            output, error = process.communicate()
            data = output
            if (len(data) > 0):
                self.sendDataToFrontend(data)
    

if __name__ == "__main__":
    print('Start socket server\n')
    SockServer('localhost', HIDDEN_SERVICE_PORT).handleIncomingConnections()
    print('Socket server started\n')
    # sendMessage(TEST_HOSTNAME, TEST_DATA)