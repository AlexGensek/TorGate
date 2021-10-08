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

def sendMessage(this_hostname, other_hostname, data):
    socks.setdefaultproxy(socks.PROXY_TYPE_SOCKS5, "127.0.0.1", 9050, True)
    s = socks.socksocket()
    s.connect((TEST_HOSTNAME, 5555))
    message = {"sender_address": this_hostname, "message": data}
    message_serialized = str(json.dumps(message)).encode()
    print(message_serialized)
    s.sendall(message_serialized)
    print("Message %s was sent" % message_serialized)
    

    # with TorClient() as tor:
    #     # Choose random guard node and create 3-hops circuit
    #     with tor.create_circuit(3) as circuit:
    #         # Create tor stream to host
    #         with circuit.create_stream((other_hostname, HIDDEN_SERVICE_PORT)) as stream:
    #             message = {"sender_address": this_hostname, "message": data}
    #             message_serialized = str(json.dumps(message)).encode()
    #             print(message_serialized)
    #             stream.send(message_serialized)
    #             print("Message %s was sent" % message_serialized)


class SockServer(object):
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # self.sock.bind((self.host, self.port))
        # self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    def sendDataToFrontend(self, data, sender_address):
        print("Received : %s from %s" % (data, sender_address))   

    def handleIncomingConnections(self):
        threading.Thread(target = self.listen).start()  

    def listen(self):  #Функция, ожидающая новых подключений
        # self.sock.listen(10)
        while True:
            bashCmd = ["nc", "-l", "-p", "5555"]
            process = subprocess.Popen(bashCmd, stdout=subprocess.PIPE)
            output, error = process.communicate()
            print(output)
            # client, address = self.sock.accept()
            # print("New connection accepted")
            # ts_start = time.time()
            # ts_current = time.time()
            # while(ts_current - ts_start < RX_TIMEOUT):
            #     data = client.recv(1024)
            #     ts_current = time.time()
            # print("Received %s bytes" % len(data))
            # if(len(data) > 0):
            #     data_deserialized = json.loads(data)
            # self.sendDataToFrontend(data_deserialized['message'], data_deserialized['sender_address'])
        
    

    

if __name__ == "__main__":
    print('Start socket server\n')
    SockServer('localhost', HIDDEN_SERVICE_PORT).handleIncomingConnections()
    print('Socket server started\n')
    # sendMessage(TEST_HOSTNAME, TEST_DATA)