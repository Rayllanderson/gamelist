import cookies from 'next-cookies'
import Cookies from 'js-cookie'

export const tokenStorage = (ctx: any) => ({
  setItem: async (key: string, value: string) => {
    Cookies.set(key, value)
  },
  getItem: async (key: string) => {
    const allCookies = cookies(ctx)
    const item = allCookies[escape(key)]
    return item
  },
  removeItem: async (key: string) => {
    Cookies.remove(key)
  }
})