module Pursuit.Client.Main where

import Prelude

import Data.Const (Const)
import Data.Either (either)
import Effect (Effect)
import Effect.Aff (Aff, runAff_)
import Effect.Exception (throwException)
import Halogen (ClassName(..), Component)
import Halogen.Aff (awaitBody)
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Halogen.Hooks as Hooks
import Halogen.VDom.Driver (runUI)

main :: Effect Unit
main = runAff_ (either throwException pure) do
  body <- awaitBody
  void $ runUI rootComponent unit body

rootComponent ∷ Component (Const Unit) Unit Unit Aff
rootComponent = Hooks.component \_ _ -> Hooks.do
  Hooks.pure $
    HH.div
      [ HP.class_ $ ClassName "Root" ]
      [ HH.text "Hello world" ]
