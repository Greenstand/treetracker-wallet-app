#echo 'Access Token:'
#read TOKEN

doctl auth init # --access-token $TOKEN

#echo 'Schema:'
#read SCHEMA
source scripts/vars.sh

SERVICE_PASSWORD=`doctl databases user get 397700c8-6591-4a27-8d65-50af5c9a0263 s_$SCHEMA --format Password --no-header`
MIGRATION_PASSWORD=`doctl databases user get 397700c8-6591-4a27-8d65-50af5c9a0263 m_$SCHEMA --format Password --no-header`
INTEGRATION_PASSWORD=`doctl databases user get 397700c8-6591-4a27-8d65-50af5c9a0263 integration --format Password --no-header`

cp .env.test.example .env.test
sed -i '' "s/{SCHEMA}/$SCHEMA/" .env.test
sed -i ''  "s/{PASSWORD}/$INTEGRATION_PASSWORD/" .env.test

cp .env.development.example .env.development
sed -i '' "s/{SCHEMA}/$SCHEMA/" .env.development
sed -i ''  "s/{PASSWORD}/$SERVICE_PASSWORD/" .env.development
sed -i ''  "s/{SEEDER_PASSWORD}/$MIGRATION_PASSWORD/" .env.development

cp database/database.json.example database/database.json

sed -i '' "s/{SCHEMA}/$SCHEMA/" database/database.json
sed -i ''  "s/{INTEGRATION_PASSWORD}/$INTEGRATION_PASSWORD/" database/database.json
sed -i ''  "s/{MIGRATION_PASSWORD}/$MIGRATION_PASSWORD/" database/database.json


#echo $SERVICE_PASSWORD
#echo $MIGRATION_PASSWORD
#echo $INTEGRATION_PASSWORD
