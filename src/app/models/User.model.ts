type DrinkPreference = "coca" | "pepsi"

class User {
  constructor(public firstName: string, public lastName: string,
    public email: string, public drinkPreference: DrinkPreference,
    public hobbies?: string[]
  ) {

  }
}

export {
  User
}