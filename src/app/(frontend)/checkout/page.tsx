'use client';
import Loading from '@/app/components/Loading/Loading';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { FaRegSmileBeam } from 'react-icons/fa';

function CheckoutPage() {
	const searchParams = useSearchParams();
	const [options, setOptions] = useState();
	const [selectedOption, setSelectedOption] = useState();
	const [loading, setLoading] = useState(true);
	const redirectTimer = useState(20);
	const lang = searchParams.get('lang');

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${lang === 'en' ? 'optionData.json' : 'optionDataArabic.json'}`
			);
			const data = await response.json();
			setOptions(data);
			setSelectedOption(
				data.find((d) => d.id == searchParams.get('optionId'))
			);
			setLoading(false);
		};
		fetchData();
	}, [searchParams]);

	useEffect(() => {
		if (!loading && selectedOption?.id) {
			setTimeout(() => {
				redirectTimer[1](redirectTimer[0] - 1);
				if (redirectTimer[0] <= 0) {
					window.location.href = '/';
				}
			}, 1000);
			return () => clearTimeout(redirectTimer[1]);
		}
	}, [loading, redirectTimer, selectedOption?.id]);

	if (loading) {
		return <Loading />;
	}
	return (
		<div className='text-center'>
			<div>
				<FaRegSmileBeam className='text-center w-full text-[120px] mb-10 text-green-500' />
				<p className='text-lg'>
					Mr/Ms: {searchParams.get('parentName')} we received your
					request about{' '}
					<span className='font-bold'>{selectedOption?.title}</span>
				</p>

				{/* <p className='row-span-1 border border-black p-3'>
					{selectedOption?.title}
				</p> */}
			</div>
			<div>
				{selectedOption?.message?.map((message, index) => (
					<p className='text-lg text-blue-700 p-5' key={index}>
						{message}
					</p>
				))}
			</div>
			<p className='text-xs text-red-500'>
				Redirect to home page within {redirectTimer} second
			</p>
		</div>
	);
}

export default function CheckoutPageWithSuspense() {
	return (
		<Suspense fallback={<Loading />}>
			<CheckoutPage />
		</Suspense>
	);
}
