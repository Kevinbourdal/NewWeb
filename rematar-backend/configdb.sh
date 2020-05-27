## Correr en la maquina donde se ejecutara el docker

# download mysql:8
docker pull mysql:8

# Executar mysql with name and root password
docker run --name=mysql-subastas -e MYSQL_ROOT_PASSWORD=fernetconcoca2020! -d mysql:8

# connect to docker
docker exec -ti mysql-subastas bash


### Comandos a ejecutar dentro del docker
# ========================================================================================
# open mysql console
mysql -u root -p
# create database
CREATE DATABASE subastasenweb;
# create an new user
CREATE USER 'api_account'@'localhost' IDENTIFIED BY '123456';
# Set all privileges to user created
GRANT ALL PRIVILEGES ON databaseName.* TO 'api_account'@'localhost';

FLUSH PRIVILEGES;

QUIT

exit

### Get mysql docker ip address
docker inspect mysql-subastas | grep "IPAddress"

# Con esta IP, el puerto: 3306 y el nombre de la base de datos ("MineSecurity2") te podes conectar
# seteando en src/config/development.py los campos




# Opcion 1

##### Con docker
docker build -t backend-remates .
docker run -d --name=bankend-remates -p 3000:3000 backend-remates

docker inspect bankend-remates | grep "IPAddress"
# Con esta IP, el puerto: 5000 te podes conectar
# desde el frontend

###FIN





# Opcion 2

##### Instalar en el sistema

### Librerias requeridas para conectarse a mysql a travez de la API

# install driver and connector
sudo apt install odbcinst1debian2 libodbc1 unixodbc-dev python3-dev default-libmysqlclient-dev python3-mysqldb -y

# activar virtualenv si no tiene pip instalado en el sistema
#. venv/bin/activate
pip install mysqlclient


### Descargar el driver a utilizar por la api para conectarse a MySql
# download driver url:
# https://dev.mysql.com/downloads/connector/odbc/
# Ubuntu 19:
# $ wget https://dev.mysql.com/get/Downloads/Connector-ODBC/8.0/mysql-connector-odbc-8.0.19-linux-ubuntu19.10-x86-64bit.tar.gz
# Ubuntu 18 LTS:
# $ wget https://dev.mysql.com/get/Downloads/Connector-ODBC/8.0/mysql-connector-odbc-8.0.19-linux-ubuntu18.04-x86-64bit.tar.gz
# Windows:
# $ wget https://dev.mysql.com/get/Downloads/Connector-ODBC/8.0/mysql-connector-odbc-8.0.19-winx64.msi

# Ubuntu 18 LTS:
 $ wget https://dev.mysql.com/get/Downloads/Connector-ODBC/8.0/mysql-connector-odbc-8.0.19-linux-ubuntu18.04-x86-64bit.tar.gz

# Ejecutar los comandos siguientes donde se descargo el driver (ejemplo para Ubuntu 19, puede cambiar el nombre del archivo)

gunzip mysql-connector-odbc-8.0.19-linux-ubuntu19.10-x86-64bit.tar.gz
tar xvf mysql-connector-odbc-8.0.19-linux-ubuntu19.10-x86-64bit.tar
cd mysql-connector-odbc-8.0.19-linux-ubuntu19.10-x86-64bit.tar/ || exit
sudo yes | cp bin/* /usr/local/bin
sudo yes | cp lib/* /usr/local/lib

# registramos el driver para poder utilizarlo
sudo myodbc-installer -a -d -n "MySQL ODBC 8.0 Driver" -t "Driver=/usr/local/lib/libmyodbc8w.so"
sudo myodbc-installer -a -d -n "MySQL ODBC 8.0" -t "Driver=/usr/local/lib/libmyodbc8a.so"
myodbc-installer -d -l

## una vez completados los pasos con exito y seteado la ip y puerto en la configuracion de la API debera ejecutar el
## script migrate.sh para crear las tablas en

### Ejcutar con virtualenv activado:
# rm -r migrations/
# python migrate.py db init
# python migrate db migate
# python migrate.py db upgrade
#