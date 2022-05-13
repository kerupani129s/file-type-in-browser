#!/bin/bash
set -euoo pipefail posix

# 
function openssl_md4() {
	local -r file="$1"
	# OpenSSL 3.0 & OpenSSL 1.1
	openssl md4 -provider legacy "$file" 2>/dev/null || openssl md4 "$file"
}

function content_hash() {
	local -r file="$1"
	openssl_md4 "$file" | awk '{ print substr($NF, 0, 20) }'
}

# 
MAIN_CSS_PARAM="v=$(content_hash ./docs/main.css)"
readonly MAIN_CSS_PARAM
MAIN_JS_PARAM="v=$(content_hash ./docs/main.js)"
readonly MAIN_JS_PARAM

# 
sed -Ei \
	-e 's/(["/]main\.css\?)[^"]*/\1'"$MAIN_CSS_PARAM"'/g' \
	-e 's/(["/]main\.js\?)[^"]*/\1'"$MAIN_JS_PARAM"'/g' \
	./docs/index.html

# 
echo 'OK'
