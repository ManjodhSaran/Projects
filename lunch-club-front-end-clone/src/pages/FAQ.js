import { Paper } from '@material-ui/core'
import React from 'react'
import AccordionCustom from '../components/AccordionCustom'
import ContactUsCard from '../components/ContactUsCard'
import Header from '../components/Header'
import '../styles/FAQ.scss'

const FAQ = () => {
    const FAQs = [
        { q: 'How do I change the email to my account?', a: 'You can change account where you receive emails from Lunchclub under Settings → primary email.\nYou can also connect additional Google accounts to your Lunchclub account to add and invite more connections. This will help our AI learn about who is in your network and find more relevant matches for you! We do not contact any of your connections without your permission.' },
        { q: 'How can I edit my objectives?', a: 'You can edit your objectives under Settings in the top right corner when logged in. You can also add details to your objectives in the same page. The more information you give us, the more we can cater your matches to you! Each week, you can select your primary objective for the week. This means that the algorithm will lean towards matching you for that objective over the others.' },
        { q: 'How can I pause my account?', a: 'If you’re looking to pause meetings for a few weeks, you can select “snoozed” on the Settings page and pause emails for 1-4 weeks.' },
        { q: 'How can I change my main hub?', a: 'If you’ve relocated, you can update your account hub under Settings in the top right corner when logged in. If you’d like to meet more people outside of your immediate hub, you can also toggle “best match globally” when signing up each week on the Weekly page.' },
        { q: 'How can I delete my account?', a: 'You can delete your account under Settings in the top right corner when logged in. This will permanently delete all records of previous matches and Clubpoints, so you may consider signing up for 1-2 more matches to spend them on meeting a founder or investor.\nYou’re also welcome to rejoin with the same email at any time—we’ll miss you!' },
        { q: 'How is my Google information used?', a: 'Your contact and calendar data helps us schedule meetings and ensure that your matches are relevant (not matching you with people you already know, for instance). We do not contact any of your connections without your permission. We are serious about your privacy and will never share your private data with other users or third parties without your consent. You can find more information on our privacy policy.' },
        { q: 'How do I report abuse?', a: 'If you had an experience that you would like to report to us, please click contact us below, and we’ll look into this right away.' },
    ]
    return (
        <div className='faq'>
            <Header />
            <Paper className="faq__content">
                <h3>FAQ</h3>
                <div className="faq__List">
                    {FAQs.map(({ q, a }) => <AccordionCustom key={q} ques={q} ans={a} />)}
                </div>
                <div className="contactUs">
                    <h3></h3>
                    <div className="contactUs__cards">
                        <ContactUsCard
                            title='Customer service'
                            buttonTitle='Contact us'
                            buttonAction={'/faq'}
                            text='Have a question not covered above? Send us a message! Someone on our team will get in contact with you as soon as we can! Contact us with the button below or at support@lunchclub.ai'
                        />
                        <ContactUsCard
                            title='Product Feedback'
                            buttonTitle='Write Feedback'
                            buttonAction={'/faq'}
                            text='Do you have feedback or suggestions for us? Let us know here! We love hearing from you to improve your Lunchclub experience! Send feedback with the button below or at support+product@lunchclub.ai'
                        />
                    </div>
                </div>

            </Paper>
        </div>
    )
}

export default FAQ
