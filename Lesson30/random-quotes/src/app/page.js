'use client';

// import {quotes} from '../quotes';
import { quotes as initialQuotes } from '@/quotes';
import { useState } from 'react';
import { Button } from '@/components/button';

// We do not have authentication in place yet, therefor we assume that we only have one user with id user-1
const userId = 'user-1';

// Initial quotes do not have likedBy property, so for consitency we add it to every quote in the array before using the array as state.
const updatedInitialQuotes = initialQuotes.map((quote) => ({
	...quote,
	likedBy: [],
}));

export default function Home() {
	const [index, setIndex] = useState(0);
	const [quotes, setQuotes] = useState(updatedInitialQuotes);

	function handleNextClick() {
		if (index < quotes.length - 1) setIndex(index + 1);
	}

	function handlePrevClick() {
		if (index > 0) {
			setIndex(index - 1);
		}
	}

	function handleLike() {
		setQuotes((prevQuotes) => {
			return prevQuotes.map((quote, elementIndex) => {
				if (elementIndex === index) {
          /* My mistake was to use push. In react, you are not allowed to mutate the state directly. You have to return a new object. Common way to do this is to use the spread operator.
          Lesson: if something does not work as expected, check if you are mutating the state (reassigning values instead of recreating values) directly somewhere.
          
          This particular case will allow us to add user id to the likedBy array multiple times which is ok for beginning but is not acceptable in real life. Below, I add a better solution where we first check if the user id is already in the array and if it is, we remove it, otherwise we add it. */
          
					return {
						...quote,
						likedBy: [...quote.likedBy, userId]
					};
				}
        /**
         *if (elementIndex === index) {
					const isLiked = quote.likedBy.includes(userId);
					return {
						...quote,
						likedBy: isLiked
							? quote.likedBy.filter((id) => id !== userId)
							: [...quote.likedBy, userId],
					};
				}
         */
				return quote;
			});
		});
	}

	const isLikedQuote = () => quotes.likedBy.includes(userId);

	return (
		<div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
			<main className='flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
				<div>
					<Button
						onClick={handleLike}
						label={isLikedQuote ? '💔' : '❤️'}
						variant='icon'
					/>

					<p>{quotes[index].quote}</p>
					<span>- {quotes[index].author}</span>

					<div className='flex gap-4'>
						<Button
							onClick={handlePrevClick}
							label={'Previous quote'}
							disabled={index === 0}
						/>
						<Button
							onClick={handleNextClick}
							disabled={index === quotes.length - 1}
							label={'Next quote'}
							variant='primary'
						/>
					</div>
				</div>
			</main>
		</div>
	);
}
