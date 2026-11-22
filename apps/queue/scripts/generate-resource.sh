#!/bin/bash

# Get resource name
read -p "Enter resource name in camelcase (starting with a small letter): " resource

## HANDLERS
# delete resource_name if it is still there
rm -r ../server/handlers/resource_name 

# create a new folder in handlers with schemas.js and index.js, maybe create crud functions
mkdir ../server/handlers/$resource"Handler"

# prepare schema file
sed "s/RESOURCE/$resource/" \
  template/handler/schemas.js \
  >../server/handlers/$resource"Handler"/schemas.js

# # prepare index file
RESOURCE_CAP=${resource^}
RESOURCE_SNAKE_CASE=$(node ./scripts/camelToSnakeCase.js $resource)
RESOURCE_SPLIT=$(node ./scripts/splitCamelCase.js $resource)

sed -e "s/RESOURCE_CAP/$RESOURCE_CAP/g" \
    -e "s/RESOURCE_SNAKE_CASE/$RESOURCE_SNAKE_CASE/g" \
    -e "s/RESOURCE_SPLIT/$RESOURCE_SPLIT/g" \
    -e "s/RESOURCE/$resource/g" \
  template/handler/index.js \
  >../server/handlers/$resource"Handler"/index.js

# update handlers/index.js with link to the resource
import=""
for dir in ../server/handlers/*/; 
do 
  file=$(basename $dir)
  import+="...require('./$file') ,\n";
done

sed -e "s~HANDLERS~$import~" \
  template/handler/handlerIndex.js \
  >../server/handlers/index.js

## Services
sed -e "s/RESOURCE_CAP/$RESOURCE_CAP/g" \
    -e "s/RESOURCE/$resource/g" \
  template/service.js \
  >../server/services/$RESOURCE_CAP"Service".js

## Models
sed -e "s/RESOURCE_CAP/$RESOURCE_CAP/g" \
    -e "s/RESOURCE/$resource/g" \
  template/model.js \
  >../server/models/$RESOURCE_CAP.js

## Repositories
sed -e "s/RESOURCE_CAP/$RESOURCE_CAP/g" \
    -e "s/RESOURCE_SNAKE_CASE/$RESOURCE_SNAKE_CASE/g" \
  template/repository.js \
  >../server/repositories/$RESOURCE_CAP"Repository".js

## Routes
sed -e "s/RESOURCE_SNAKE_CASE/$RESOURCE_SNAKE_CASE/g" \
    -e "s/RESOURCE/$resource/g" \
  template/routes/routes.js \
  >../server/routes/$resource"Routes".js

# routes index file
routes=""
for dir in ../server/routes/*; 
do 
  file=$(basename $dir)
  file=${file%.js}
  print $file
  if [ $file != 'index' ]
  then
    routes+="require('./${file}') ,\n";
  fi
  
done

sed -e "s~ROUTES~$routes~" \
  template/routes/index.js \
  >../server/routes/index.js


