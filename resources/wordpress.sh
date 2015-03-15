/bin/bash

# Get WordPress's latest version.
wget --no-check-certificate https://wordpress.org/latest.zip

# Unzip the WordPress package.
unzip latest.zip

# Move all the WordPress files to the project's root directory.
mv wordpress/* .

# Remove the now unnecessary WordPress directory.
rm -rf wordpress/

# List the files to confirm the installation.
ls
