import React from 'react'
import '../styles/Testimonials.scss'

const Testimonials = () => {
    const users = [
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
        { name: 'Kistina Cahojova', post: "Co-Founder and CEO @ KEGG", content: '"Without Lunchclub, we might not have been able to get this first check."' },
    ]
    return (
        <div className='testimonials'>
            <div className='testimonials__row1'>
                {users.map(({ name, post, content }) =>
                    <div className='testimonial'>
                        <div className='testimonial__header'>
                            <img src='https://lunchclub.com/static/media/kristina-cahojova.068d5fa7.png' />
                            <div>
                                <h4>{name}</h4>
                                <p>{post}</p>
                            </div>
                        </div>
                        <div className='testimonial__content'>
                            <p>{content}</p>
                        </div>
                    </div>
                )}

            </div>
            <div className='testimonials__row2'>
                {users.map(({ name, post, content }) =>
                    <div className='testimonial'>
                        <div className='testimonial__header'>
                            <img src='https://lunchclub.com/static/media/kristina-cahojova.068d5fa7.png' />
                            <div>
                                <h4>{name}</h4>
                                <p>{post}</p>
                            </div>
                        </div>
                        <div className='testimonial__content'>
                            <p>{content}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Testimonials
