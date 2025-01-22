

function handleMovementCollisions(){
    let collisionCount = 0
    for (const obj of objects) {
        if (obj !== selectedPackage && obj.userData.type === 'parcel') {
            const otherPackage = obj;
            const collisions = checkCollision(selectedPackage, otherPackage)
            const areColliding = collisions.originalCollision
            const areMarginColliding = collisions.marginCollision
            if (areColliding && obj.userData) {
                collisionCount = collisionCount + 1
                collidingObject = obj
                if (!areMarginColliding){
                    if(stackCounter === 0){
                        console.log("outside margin")
                        changeEdgeColor(greenColor)
                        canStack = false;
                        canPlace = true;
                        selectedPackage.position.y = getPackageHeight(selectedPackage);
                    }
                }else{
                    console.log("inside margin")
                    stackCounter = stackCounter + 1
                    const otherPackageTop = otherPackage.position.y + getPackageHeight(otherPackage);
                    selectedPackage.position.y = otherPackageTop + getPackageHeight(selectedPackage);
                }
            }
        }
    }
    return collisionCount
}


function snapPackageToCollider() {			
    stickToCursor = false;
    if (selectedPackage && collidingObject) {
        const selectedBox = new THREE.Box3().setFromObject(selectedPackage);
        const collidingBox = new THREE.Box3().setFromObject(collidingObject);

        const selectedCenter = new THREE.Vector3();
        selectedBox.getCenter(selectedCenter);

        const collidingCenter = new THREE.Vector3();
        collidingBox.getCenter(collidingCenter);

        const collidingSize = new THREE.Vector3();
        collidingBox.getSize(collidingSize);

        const packageHeightCalculated = getPackageHeight(selectedPackage)
        const faces = getFaces(collidingCenter,packageHeightCalculated,collidingBox)

        let closestFace = null;
        let minDistance = Infinity;

        for (const [face, position] of Object.entries(faces)) {
            const distance = selectedCenter.distanceTo(position);
            if (distance < minDistance) {
                minDistance = distance;
                closestFace = face;
            }
        }

        const selectedSize = new THREE.Vector3();
        selectedBox.getSize(selectedSize);
        snapToClosestFace(closestFace,packageHeightCalculated,collidingCenter,collidingBox,selectedSize)
    }
    confirmDropObject();
}