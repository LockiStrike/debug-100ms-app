# Following variable must be passed in
# SENTRY_AUTH_TOKEN
# SENTRY_PROJECT

SENTRY_ORG=lockerverse
PREFIX=dist
SENTRY_CLI=./node_modules/.bin/sentry-cli

setup_release: create_release upload_sourcemaps

create_release:
	$(SENTRY_CLI) releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)

associate_commits:
	-$(SENTRY_CLI) releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --local $(VERSION)

upload_sourcemaps:
	$(SENTRY_CLI) releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files \
    		$(VERSION) delete --all

	$(SENTRY_CLI) releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files \
		$(VERSION) upload-sourcemaps --url-prefix "~/" --rewrite --validate $(PREFIX)
