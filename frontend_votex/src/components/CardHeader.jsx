import React from 'react'

function CardHeader({user, leftHero, rightHero, logo}) {
    return (
        <div className='bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-full max-w-5xl flex items-center justify-between border border-white/40'>
            <img src={leftHero} alt="leftHero" className='w-24 hidden md:block' />
            <div className="text-center">
                <img src={logo} alt="logoSekolah" className="w-12 mx-auto mb-2" />

                <h2 className="font-semibold text-[#1A3C28] text-lg leading-snug">
                    Pemilihan Ketua dan Wakil Ketua Osis
                    SMK ISLAM AL AMANAH SALEM
                </h2>

                <p className="text-sm text-[#757575]">
                    Pilih Kandidat dengan Bijak
                </p>

                <p className="font-bold mt-2">
                    {user?.username}
                </p>
            </div>

            <img src={rightHero} alt="rightHero" className="w-24 hidden md:block" />
        </div>
    )
}

export default CardHeader