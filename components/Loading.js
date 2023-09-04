import Image from 'next/image'
import React from 'react'

const Loading = () => {
    return (
        <div>
            <div className='w-20 h-20 fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2'>
                <Image src={"/loading.svg"} layout="fill" objectFit="contain" />
            </div>
        </div>
    )
}

export default Loading
