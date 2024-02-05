/**
 * The common fields in package.json files.
 */
export interface pkgJson {
  /**
   * Package name
   */
  name?: string
  /**
   * Package version
   */
  version?: string
  /**
   * Package description
   */
  description?: string
  /**
   * Defines which package manager is expected to be used when working on
   * the current project. This field is currently experimental and needs
   * to be opted-in; see https://nodejs.org/api/corepack.html
   */
  packageManager?: string
  /**
   * Specify the place where your code lives. This is helpful for people who want to contribute.
   */
  repository?: {
    type?: string
    url?: string
  }
  /**
   * A person who has been involved in creating or maintaining this package.
   */
  author?: string
  /**
   * ToDo: add more fields
   */
}
