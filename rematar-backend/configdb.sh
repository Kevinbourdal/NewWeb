## Correr en la maquina donde se ejecutara el docker
# ========================================================================================

## MySQL
# ===============================================================
# download mysql:8
docker pull mysql:8

# Creamos un container que ejecutara mysql
docker run -d --name=mysql-subastas -e MYSQL_ROOT_PASSWORD=fernetconcoca2020! -v $PWD/db:/docker-entrypoint-initdb.d/:ro mysql:8

### Get mysql docker ip address
docker inspect mysql-subastas | grep "IPAddress"
# Con esta IP, el puerto: 3306 y el nombre de la base de datos ("subastasenweb") te podes conectar
# seteando en src/config.py los campos


## start docker again (si apagaste la compu)
#docker container start mysql-subastas
#docker exec -it mysql-subastas bash (para entrar a la base de datos)
#mysql -u root -p (esto pide la contraseña)

## Instalar driver para conectarse a mysql desde python
# ===============================================================
sudo apt-get install default-libmysqlclient-dev python3-dev -y


## Sincronizar tablas desde python a mysql
# ===============================================================
# ejecutar desde la carpeta NewWeb/rematar-backend/
./migrate.sh



## Ejecutar la api
# ===============================================================
# Activamos el virtualenv
source venv/bin/activate

cd src/
python run.py
