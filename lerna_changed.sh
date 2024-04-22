IGNORE_TAGS=$(git tag -l "4.*")
lerna changed --ignore-changes "$IGNORE_TAGS"