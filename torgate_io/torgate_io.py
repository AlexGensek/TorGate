from torpy import TorClient
import socket
import threading

HIDDEN_SERVICE_PORT = 5555

TEST_HOSTNAME = 'k7a2o3ftuipxa4ov.onion'
TEST_DATA = b'test_raz_dva_tri'

def sendMessage(hostname, data):
    print('sendMessage')
    print(data)
    with TorClient() as tor:
        # Choose random guard node and create 3-hops circuit
        with tor.create_circuit(3) as circuit:
            # Create tor stream to host
            with circuit.create_stream((hostname, HIDDEN_SERVICE_PORT)) as stream:
                stream.send(data)


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
        self.sock.listen(500)
        while True:
            client, address = self.sock.accept()
            data = client.recv(1024)
            print("data len " + str(len(data)))
            if len(data) > 0:
                self.sendDataToFrontend(data)
        
    

    

if __name__ == "__main__":
    print('Start socket server\n')
    SockServer('localhost', HIDDEN_SERVICE_PORT).handleIncomingConnections()
    print('Socket server started\n')
    # sendMessage(TEST_HOSTNAME, TEST_DATA)