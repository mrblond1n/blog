/* eslint @typescript-eslint/no-var-requires: "off" */
const removeImports = require('next-remove-imports')()
/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
})

module.exports = removeImports(withPWA())
