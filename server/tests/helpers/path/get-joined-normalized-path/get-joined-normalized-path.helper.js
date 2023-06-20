import { pipe } from '#libs/helpers/helpers.js';

import { joinPath } from '../join-path/join-path.helper.js';
import { normalizeTrailingSlash } from '../normalize-trailing-slash/normalize-trailing-slash.helper.js';

const getJoinedNormalizedPath = pipe(joinPath, normalizeTrailingSlash);

export { getJoinedNormalizedPath };
