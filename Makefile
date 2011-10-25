VERSION=1.3.0
DATE=$(shell DATE)
BOOTSTRAP = ./css/style.css
BOOTSTRAP_MIN = ./css/style.min.css
BOOTSTRAP_LESS = ./less/bootstrap.less
MYSCRIPTS = ./js/yepnope.js ./js/codemirror.js ./js/codemirror-javascript.js ./js/my.js
LESS_COMPESSOR ?= `which lessc`
WATCHR ?= `which watchr`
UGLIFYJS ?= `which uglifyjs`

build:
	@@if test ! -z ${LESS_COMPESSOR}; then \
		sed -e 's/@VERSION/'"v${VERSION}"'/' -e 's/@DATE/'"${DATE}"'/' <${BOOTSTRAP_LESS} >${BOOTSTRAP_LESS}.tmp; \
		lessc ${BOOTSTRAP_LESS}.tmp > ${BOOTSTRAP}; \
		lessc ${BOOTSTRAP_LESS}.tmp > ${BOOTSTRAP_MIN} --compress; \
		rm -f ${BOOTSTRAP_LESS}.tmp; \
		echo "Bootstrap successfully built! - `date`"; \
	else \
		echo "You must have the LESS compiler installed in order to build Bootstrap."; \
		echo "You can install it by running: npm install less -g"; \
	fi

	@@if test ! -z ${UGLIFYJS}; then \
	    cat ${MYSCRIPTS} > ./js/compiled.js; \
	    echo "scripts compiled"; \
        uglifyjs --unsafe -o ./js/compiled.min.js ./js/compiled.js; \
        echo "compiled scripts minified!"; \
    else \
        "You must have UglifyJS installed";\
    fi \

watch:
	@@if test ! -z ${WATCHR}; then \
	  echo "Watching less files..."; \
	  watchr -e "watch('less/.*\.less') { system 'make' }"; \
	else \
		echo "You must have the watchr installed in order to watch Bootstrap less files."; \
		echo "You can install it by running: gem install watchr"; \
	fi

.PHONY: build watch