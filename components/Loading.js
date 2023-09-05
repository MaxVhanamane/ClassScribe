import Image from 'next/image'
import React from 'react'

const Loading = () => {
    return (
        <div>
            <div className='w-16 h-16  fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2'>
                <Image src={"/loading.svg"} layout="fill" objectFit="contain" alt='Loading' />
            </div>
        </div>
    )
}

export default Loading
