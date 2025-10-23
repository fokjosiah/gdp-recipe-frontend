export type RecipeDifficulty = "easy" | "medium" | "hard"

export interface Recipe extends CreateRecipe{
  id: string,
  favorite: boolean
}

export interface CreateRecipe {
  name: string,
  ingredients: string[],
  instructions: string,
  prep_time_mins: number,
  difficulty: RecipeDifficulty,
}
