'use client';

import { useContext } from 'react';
import { Button } from '@/components/button';
import { QuotesContext } from '@/app/context/QuotesContext';
import {userId} from '@/lib/auth';


export default function Home() {
	const {quotes, index, handleLike, handleNextClick, handlePrevClick} = useContext(QuotesContext);
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
