/* eslint @typescript-eslint/no-var-requires: "off" */
const removeImports = require('next-remove-imports')()
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
})
/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  distDir: 'build',
}

module.exports = removeImports({...withPWA(), ...config})
