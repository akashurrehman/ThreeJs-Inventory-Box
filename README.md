1. The application should work in a web browser.
2. Technologies used: Vanilla Javascript + Three.js + optionally React, as a component.
3. The application will be used to calculate the space needed to store specific
shipments (parcels).
4. Parcels can be placed in the declared space (width x length x height), optionally they
can go outside the space in order to move it with the marking on the screen.
5. Parcels should be placed sequentially when added.
6. Optionally, parcels can be placed one on top of the other to the declared height - by
default they will not be placed on top of each other.
7. You can create any number of parcels.
8. The application should monitor and display alerts:
a. Proper placement of parcels in space
b. Placing parcels one on top of the other only when possible (declared in the
parcel on which another parcel will be placed)
c. Exceeding the permissible weight in the defined warehouse "Weight limit"
