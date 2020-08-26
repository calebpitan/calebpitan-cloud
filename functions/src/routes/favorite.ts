import db from '../database'
import { Router } from 'express'

const router = Router()

const ref = db.ref()

const favoriteStunts = ref.child('FavoriteStunts')

router.post('/favorite', async (req, res) => {
  const { stunt }: { stunt: string } = req.body
  const stuntLikeRef = favoriteStunts.child(stunt)

  const { snapshot } = await stuntLikeRef.transaction((likes: number | null) => {
    if (!likes) {
      const currentLikes = 0
      return currentLikes + 1
    }
    return likes + 1
  })

  res.status(200).json({
    favorite: snapshot?.val(),
  })
})

router.get('/favorite', async (_req, res) => {
  const stuntLikeRef = favoriteStunts
  const favorites: number | null = await new Promise((fulfil, reject) => {
    stuntLikeRef.on('value', (snapshot) => {
      fulfil(snapshot.val())
    })
  })

  res.set('Cache-Control', 'public, max-age=60, s-maxage=90')

  res.status(200).json({
    favorites,
  })
})

router.get('/favorite/:stunt', async (req, res) => {
  const { stunt } = req.params
  const stuntLikeRef = favoriteStunts.child(stunt)
  const favorite: number | null = await new Promise((fulfil, reject) => {
    stuntLikeRef.on('value', (snapshot) => {
      fulfil(snapshot.val())
    })
  })

  res.set('Cache-Control', 'public, max-age=30, s-maxage=60')

  res.status(200).json({
    favorite,
  })
})

export default router
