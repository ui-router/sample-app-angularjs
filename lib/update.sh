#!/bin/sh
DEST=`dirname $0`;

SRC1="$DEST/../../ui-router/build/angular-ui-router.js"
SRC1min="$DEST/../../ui-router/build/angular-ui-router.min.js"
SRC2="$DEST/../node_modules/ui-router-extras/release/modular/ct-ui-router-extras.core.js"
SRC3="$DEST/../node_modules/ui-router-extras/release/modular/ct-ui-router-extras.statevis.js"
SRC3="$DEST/../node_modules/ui-router-extras/release/modular/ct-ui-router-extras.sticky.js"
SRC4="$DEST/../node_modules/angular/angular.js"


cp "$SRC1" "$DEST"
cp "$SRC1min" "$DEST"
cp "$SRC2" "$DEST"
cp "$SRC3" "$DEST"
cp "$SRC4" "$DEST"
