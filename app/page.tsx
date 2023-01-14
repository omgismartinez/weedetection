"use client"

import Image from 'next/image'
import { Camera, Arrow, Cannabis, HomeIcon } from 'components/icons'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Home() {
  const [modalOne, setModalOne] = useState(false)
  const [modalTwo, setModalTwo] = useState(false)
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')

  const handleImage = (e: any) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setModalOne(false)
  }

  const handleHome = () => {
    setImage(null)
    setPreview('')
    setModalTwo(false)
  }

  return (
    <main className={``}>
      <section className={`bg-primary flex flex-col items-center text-center py-5 px-2 rounded-b-3xl`}>
        <motion.div
          animate={{
            y: image ? '-15vh' : 0,
            opacity: image ? 0 : 1,
            height: image ? 0 : 'auto',
          }}
          transition={{
            duration: 0.8,
            type: 'spring',
          }}
        >
          <Image
            src={`/logo.png`}
            alt={`Weedetection`}
            width={120}
            height={120}
          />
        </motion.div>
        <motion.div
          className={'flex flex-col -space-y-3'}
          initial={{
            fontSize: '2.25rem',
            textAlign: 'center',
            width: '100%',
            margin: '0.5rem 0 0',
          }}
          animate={{
            fontSize: image ? '1.575rem' : '2.25rem',
            textAlign: image ? 'start' : 'center',
            width: image ? '83.333333%' : '100%',
            margin: image ? '1rem 0 0' : '0.5rem 0 0',
          }}
          transition={{
            duration: 0.8,
            type: 'spring',
          }}
        >
          <h1>Weedetection</h1>
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: image ? 1 : 0,
              height: image ? 'auto' : 0,
            }}
            transition={{
              duration: 0.8,
              type: 'spring',
            }}
            className={`text-base ml-4 font-black text-white transition-opacity`}>
            By la cara del cannabis
          </motion.span>
        </motion.div>
        <motion.h3
          initial={{ margin: '1.25rem 0 0' }}
          animate={{
            opacity: image ? 0 : 1,
            height: image ? 0 : 'auto',
            margin: image ? 0 : '1.25rem 0 0',
          }}
          transition={{
            duration: 0.8,
            type: 'spring',
          }}
          className={`text-2xl font-black transition-opacity`}>¿Qué cepa deseas escanear?</motion.h3>
        <div className='w-full relative mt-3 flex flex-col justify-center items-center'>
          <motion.input
            initial={{ opacity: 1 }}
            animate={{
              opacity: image ? 0 : 1,
            }}
            transition={{
              duration: 0.8,
              type: 'spring',
            }}
            className='outline-primary w-10/12 h-12 px-4 rounded-2xl' type='text' />
          <motion.div
            layout
            initial={{
              borderRadius: '1.5rem',
              height: '0.25rem',
              width: '40%',
              margin: '0.75rem 0 0',
            }}
            animate={{
              height: image ? 'auto' : '0.25rem',
              width: image ? '83.333333%' : '40%',
              margin: image ? 0 : '0.75rem auto 0',
              position: image ? 'absolute' : 'relative',
            }}
            transition={{
              duration: 0.8,
              type: 'spring',
            }}
            className={`w-full inset-x-0 top-0 z-10 bg-white text-start overflow-hidden`}>
            <motion.div
              layout
              initial={{ padding: '1.5rem', height: 'inherit' }}
              className={`whitespace-nowrap`}
            >
              <h1 className='text-xl'>Creo que:</h1>
              <div className='px-2'>
                <div className='-space-y-2'>
                  <h2 className='text-lg'>Tipo de cultivo:</h2>
                  <h2 className='text-lg text-primary'>Indoor</h2>
                </div>
                <div className='-space-y-1'>
                  <h2 className='text-lg'>Calificación:</h2>
                  <div className='flex gap-2 h-8'>
                    {[...Array(6)].map((_, i) => (
                      <Cannabis key={i} className={'text-primary w-8'} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className={`flex flex-col items-center relative ${image ? 'min-h-[465px] pt-32 justify-center' : 'min-h-[365px] justify-center'}`}>
        {preview ?
          <motion.div
            onClick={() => setModalTwo(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              type: 'spring',
            }}
            className='flex flex-col items-center justify-center cursor-pointer relative w-10/12'>
            <div className='absolute inset-y-5 z-20 rounded-full w-full h-1 bg-primary drop-shadow-[0_0_20px_#4cffa3] animate-scan-line' />
            <motion.img
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '300px' }}
              transition={{
                duration: 0.8,
                type: 'spring',
              }}
              className={`w-5/6 py-4 object-contain grayscale`} src={preview} />
            <div className='absolute w-5/6 top-0 overflow-hidden animate-scan'>
              <motion.img
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '300px' }}
                transition={{
                  duration: 0.8,
                  type: 'spring',
                }}
                className={`object-contain py-4 mx-auto`} src={preview} />
            </div>
          </motion.div>
          : <>
            <label onClick={() => setModalOne(true)}>
              <Camera className='text-white w-28 md:w-48 cursor-pointer' />
            </label>
            <input hidden onChange={(e) => handleImage(e)} type={'file'} accept={'.png, .jpg, .jpeg'} id='upload' />
            <h3 className='text-primary text-3xl font-black mt-8'>Toma una foto</h3>
          </>
        }
      </section>
      <AnimatePresence initial={false}>
        <motion.section
          key={'sectionOne'}
          animate={{
            zIndex: modalOne ? 30 : -1,
            overflow: 'hidden'
          }}
          transition={{ delay: modalOne ? 0 : 0.3 }}
          className={`absolute inset-0`}
        >
          <motion.div
            key={'bgOne'}
            animate={{
              opacity: modalOne ? 1 : 0,
              zIndex: modalOne ? 0 : -1,
            }}
            transition={{ duration: 0.3 }}
            className={`bg-black/80 absolute inset-0`}
          />
          <motion.label
            animate={{ translateY: modalOne ? '0' : '-100%' }}
            transition={{ duration: 0.3, type: 'spring' }}
            htmlFor='upload'
            className={`
                        text-primary text-3xl py-4 font-black 
                        cursor-pointer z-10 
                        flex items-center justify-center 
                        animate-pulse
                    `}
          >
            Continuar <Arrow className='w-6' />
          </motion.label>
          <AnimatePresence>
            {!image &&
              <motion.div
                layout
                key={'slideOne'}
                initial={{ translateY: '100vh' }}
                animate={{ translateY: modalOne ? 0 : 'calc(100vh - 110px)' }}
                exit={{ translateY: '100vh' }}
                transition={{ duration: 0.5, type: 'spring', damping: 38, stiffness: 700 }}
                className={`
                                bg-white px-4 rounded-t-3xl 
                                w-full h-full
                                flex flex-col items-center
                            `}
              >
                <button onClick={() => setModalOne(!modalOne)} className='w-full'>
                  <div className={`${modalOne ? '' : 'hidden'} bg-black h-1 w-32 my-4 rounded-full mx-auto`} />
                  <h1 className={`${modalOne ? 'hidden' : ''} uppercase text-xl py-2`}>La cara del cannabis</h1>
                </button>
                <div className='pb-4 h-full overflow-hidden'>
                  <div className='flex flex-col items-center w-full h-full overflow-y-auto'>
                    <h1 className='text-center text-lg font-black'>Recomendaciones para que podamos dar una mejor respuesta</h1>
                    <ul className='list-outside list-disc ml-6 mt-4'>
                      <li className='text-md font-black'>La imagen debe ser clara y nítida.</li>
                      <li className='text-md font-black'>Contraste: la imagen debe tener un buen contraste entre la flor y el fondo.</li>
                      <li className='text-md font-black'>La imagen debe ser tomada con buena iluminación.</li>
                      <li className='text-md font-black'>La imagen debe estar enfocada.</li>
                      <li className='text-md font-black'>La imagen debe estar en formato .jpg o .png.</li>
                    </ul>
                    <h3 className='text-center text-lg font-black mt-6'>La foto debera ser algo asi</h3>
                    <div className='grid grid-cols-3 gap-1'>
                      <Image
                        src={`/img1.png`}
                        alt={`Weedetection`}
                        width={120}
                        height={120}
                        className={'rounded-lg'}
                      />
                      <Image
                        src={`/img2.png`}
                        alt={`Weedetection`}
                        width={120}
                        height={120}
                        className={'rounded-lg'}
                      />
                      <Image
                        src={`/img3.png`}
                        alt={`Weedetection`}
                        width={120}
                        height={120}
                        className={'rounded-lg'}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </motion.section>
      </AnimatePresence>
      <AnimatePresence initial={true}>
        <motion.section
          key={'sectionTwo'}
          animate={{
            zIndex: modalTwo ? 30 : -1,
            overflow: 'hidden'
          }}
          transition={{ delay: modalTwo ? 0 : 0.3 }}
          className={`absolute inset-0`}
        >
          <motion.div
            key={'bgTwo'}
            animate={{
              opacity: modalTwo ? 1 : 0,
              zIndex: modalTwo ? 0 : -1,
            }}
            transition={{ duration: 0.3 }}
            className={`bg-black/80 absolute inset-0`}
          />
          <AnimatePresence>
            {preview &&
              <motion.div
                layout
                key={'slideTwo'}
                initial={{ translateY: '100vh' }}
                animate={{ translateY: modalTwo ? 0 : 'calc(100vh - 80px)' }}
                exit={{ translateY: '100vh' }}
                transition={{ duration: 0.0, type: 'spring', damping: 38, stiffness: 700 }}
                className={`
                                bg-primary px-4 rounded-t-3xl 
                                w-full h-full
                                flex flex-col items-center
                            `}
              >
                <button onClick={() => setModalTwo(!modalTwo)} className='w-full py-4'>
                  <div className={`bg-white h-1 w-32 rounded-full mx-auto`} />
                  <h1 className='uppercase text-center text-3xl mt-2'>Hawaiian Haze</h1>
                </button>
                <div className='h-full overflow-y-auto'>
                  CON SU FUERTE PEGADA, LA
                  HAWAIIAN HAZE ES UNA VARIEDAD
                  IDEAL PARA CONSUMIDORES CON
                  EXPERIENCIA. NO HAY MUCHOS
                  FUMADORES NOVATOS QUE SEAN
                  CAPACES DE LIDIAR CON SU 26% DE
                  THC. AL SER UN HIBRIDO SATIVA
                  DOMINANTE, SU EFECTO ES
                  EDIFICANTE Y VIGORIZANTE. SI SE
                  TOMA EN DOSIS PEQUEÑAS, SE PUEDE
                  FUMAR A MEDIA MAÑANA, SOBRE
                  TODO PARA APROVECHAR SU EFECTO
                  CREATIVO Y LAS RISAS QUE GENERA.
                  PUEDE PROVOCAR MAREOS, LO QUE
                  ES UNA CONSECUENCIA DIRECTA DE
                  SU POTENCIA. SIN EMBARGO, CUANDO
                  SE CONSUME A UN RITMO
                  TRANQUILO, SE ANULA LA MAYOR
                  PARTE DE ESTE EFECTO. TAMBIÉN TE
                  PERMITE EXPERIMENTAR SU AROMA
                  TERROSO CON TOQUES DE LIMON Y
                  PINO. SU CULTIVO ES MUY FÁCIL, Y
                  NO NECESITA CUIDADOS ESPECIALES.
                  EL ÚNICO INCONVENIENTE PARA LOS
                  CULTIVADORES ES QUE LA HAWAIIAN
                  HAZE SOLO PRODUCE COSECHAS
                  MEDIANAS EN LA MAYORÍA DE
                  ENTORNOS.

                  PINO. SU CULTIVO ES MUY FÁCIL, Y
                  NO NECESITA CUIDADOS ESPECIALES.
                  EL ÚNICO INCONVENIENTE PARA LOS
                  CULTIVADORES ES QUE LA HAWAIIAN
                  HAZE SOLO PRODUCE COSECHAS
                  MEDIANAS EN LA MAYORÍA DE
                  ENTORNOS.
                </div>
                <button className='flex items-center justify-center gap-2 w-full text-white py-4 animate-pulse' onClick={handleHome}>
                  <HomeIcon className='w-8' />
                  <h1 className='text-center text-4xl mt-2 uppercase'>inicio</h1>
                </button>
              </motion.div>
            }
          </AnimatePresence>
        </motion.section>
      </AnimatePresence>
    </main >
  )
}
