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

## start docker again (si apagaste la compu)
#docker container start mysql-subastas

### Get mysql docker ip address
docker inspect mysql-subastas | grep "IPAddress"

# Con esta IP, el puerto: 3306 y el nombre de la base de datos ("subastasenweb") te podes conectar
# seteando en src/config.py los campos




# Opcion 1

##### Con docker
docker build -t backend-remates .
docker run -d --name=backend-remates -p 5000:5000 -v $PWD/src:/app/. backend-remates

docker inspect backend-remates | grep "IPAddress"
# Con esta IP, el puerto: 5000 te podes conectar
# desde el frontend

###### Ejecutar los comandos para actualizar la base de datos definida en models
### Entrar al docker con consola
docker exec -it  backend-remates /bin/bash

### borrar la base de datos!! ( Solo para cambios grandes y evitar errores de compatibilidad )
yes | rm -r migrations/
python migrate.py db init
#####---------------

### Para actualizar los cambios pequeños hechos ( nuevas columnas, o tablas )
python migrate.py db migrate
python migrate.py db upgrade

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

# Ubuntu 20 LTS:
$ wget https://dev.mysql.com/get/Downloads/Connector-ODBC/8.0/mysql-connector-odbc_8.0.20-1ubuntu20.04_amd64.deb
sudo dpkg -i mysql-connector-odbc_8.0.20-1ubuntu20.04_amd64.deb

### Ejcutar con virtualenv activado:

rm -r migrations/
python migrate.py db init
python migrate db migate
python migrate.py db upgrade
