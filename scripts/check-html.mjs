import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import assert from 'node:assert/strict'

const dist = join(process.cwd(), 'dist')
const read = (file) => readFileSync(join(dist, file), 'utf8')

const home = read('index.html')
assert.match(home, /<h1[^>]*>Simon Huang<\/h1>/, 'home h1')
assert.match(home, /id="work"/, 'legacy work anchor')
assert.match(home, /id="connect"/, 'legacy connect anchor')
assert.match(home, /Updated October 24, 2026/, 'dated now summary')
assert.doesNotMatch(home, /opacity:\s*0/, 'home text is not hidden')

const project = read('projects/engineering-ai/index.html')
assert.match(project, /Why this matters/, 'project question')
assert.match(project, /First public version/, 'verified milestone')
assert.doesNotMatch(project, /dive count|certification/i, 'no invented scuba facts')

const writing = read('writing/index.html')
assert.match(writing, /No public notes yet/, 'empty writing state')

const missing = read('404.html')
assert.match(missing, /Page not found/, '404 copy')

const profile = JSON.parse(read('profile.json'))
assert.equal(profile.schemaVersion, 1)
assert.deepEqual(
  profile.projects.map((item) => item.id),
  ['engineering-ai'],
  'only projects with real material',
)

const sitemap = read('sitemap.xml')
assert.match(sitemap, /https:\/\/simon-ai\.pages\.dev\/projects\/engineering-ai/, 'sitemap url')
assert.doesNotMatch(sitemap, /\/log/, 'log stays out of the sitemap')

const log = read('log/index.html')
assert.match(log, /Workouts, sleep, meals, and weight/, 'log page')
assert.doesNotMatch(home, /href="\/log"/, 'home does not link the log')

console.log('check-html ok')
