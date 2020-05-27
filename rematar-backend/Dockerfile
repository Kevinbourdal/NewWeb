FROM python:3.8
MAINTAINER CRISTIAN_CONTRERA <cristiancontrera95@gmail.com>

RUN apt-get update

##############################################
#                                            #
#   Install libraries for mysql connection   #
#                                            #
##############################################

RUN apt-get install wget unixodbc-dev python3-dev -y ## odbcinst1debian2 libodbc1  default-libmysqlclient-dev python3-mysqldb -y
RUN pip install mysqlclient

RUN wget https://dev.mysql.com/get/Downloads/Connector-ODBC/8.0/mysql-connector-odbc-8.0.19-linux-ubuntu19.10-x86-64bit.tar.gz
RUN gunzip mysql-connector-odbc-8.0.19-linux-ubuntu19.10-x86-64bit.tar.gz
RUN tar xvf mysql-connector-odbc-8.0.19-linux-ubuntu19.10-x86-64bit.tar
RUN cp /mysql-connector-odbc-8.0.19-linux-ubuntu19.10-x86-64bit/bin/* bin/
RUN cp /mysql-connector-odbc-8.0.19-linux-ubuntu19.10-x86-64bit/lib/* lib/

# registramos el driver para poder utilizarlo
RUN myodbc-installer -a -d -n "MySQL ODBC 8.0 Driver" -t "Driver=/lib/libmyodbc8w.so"
RUN myodbc-installer -a -d -n "MySQL ODBC 8.0" -t "Driver=/lib/libmyodbc8a.so"
RUN myodbc-installer -d -l

##############################################
#                                            #
#           Start up the flask-api           #
#                                            #
##############################################

RUN mkdir app
WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./*.py ./

EXPOSE 5000


CMD ["python", "run.py"]
#### --bind=$HOST:$PORT --name=$API_NAME --workers=4 --worker-class=eventlet 'run:run_api()'"]
