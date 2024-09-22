FROM mysql

ENV MYSQL_DATABASE=blockheads-database \
    MYSQL_ROOT_PASSWORD=dummypassword \
    MYSQL_USER=blockheads-developer \
    MYSQL_PASSWORD=dummypassword

ADD initial_db.sql /docker-entrypoint-initdb.d

EXPOSE 3306
