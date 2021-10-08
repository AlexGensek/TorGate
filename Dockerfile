FROM ubuntu:20.04

WORKDIR /usr/src/app

COPY docker_prep/requirements.txt ./
COPY docker_prep/torrc /etc/tor/torrc

ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && apt-get install -y npm python3-pip wget
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get install -y libevent-dev

RUN mkdir -p /usr/tor && chmod 700 /usr/tor
RUN wget https://dist.torproject.org/torbrowser/10.5.8/tor-browser-linux64-10.5.8_en-US.tar.xz
RUN tar xf ./tor-browser-linux64-10.5.8_en-US.tar.xz -C /usr/tor

COPY . .

CMD [ "bash", "application.sh" ]
