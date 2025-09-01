npm run build

VERSION=$(cat dockerVersion)
NEW_VERSION=$(VERSION + 0.1)

echo NEW_VERSION > dockerVersion

IMAGE_NAME="AliceWeb"

docker build -t $IMAGE_NAME:v$NEW_VERSION .
docker save -o $IMAGE_NAME.tar nginx:v$NEW_VERSION
