import React, { useEffect, useState } from 'react';
import { CoursesService } from '../../../services/CoursesService';
import { StarFilled } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import PopularCourses from './PopularCoureses';

export default function FeaturedClasses() {
    const [featureCourses, setFeatureCourses] = useState([]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await CoursesService.getClassWithMostRegistrations();
                setFeatureCourses(res.data);
            } catch (err) {
                console.error('Failed to fetch courses:', err);
            }
        }
        fetchCourses();
    }, []);

    const renderFeatureCourses = () => {
        return (
            <NavLink to={`/detail/${featureCourses?.class_id}`}>
                <div key={featureCourses?.class_id} className="grid grid-cols-12 gap-3 rounded-md bg-white shadow-sm cursor-pointer">
                    <div className="col-span-12 sm:col-span-4">
                        <img className='w-full h-full object-cover rounded-md' src="./img/feaure1.jpg" alt={`Course: ${featureCourses?.subjects?.subject_name}`} />
                    </div>
                    <div className="col-span-12 sm:col-span-8 p-2 sm:p-6">
                        <p className='line-clamp-2 font-semibold md:leading-relaxed md:text-xl text-[#666666]'>
                            {featureCourses?.subjects?.subject_name}
                        </p>
                        <p className='mt-2 md:block hidden text-[#666666] font-[300]'>
                            {featureCourses?.description?.length > 80 ? `${featureCourses?.description.slice(0,70)}...` : featureCourses?.description}
                        </p>
                        <p class="md:font-semibold font-light mt-1 sm:mt-3 text-[#666666]">{featureCourses?.users?.full_name}</p>

                        <div className="flex items-center justify-between">
                            <div className="flex space-x-2 flex-wrap items-center text-sm pt-2 text-[#666666]">
                                {featureCourses?.schedule}
                            </div>
                            <div className="text-lg font-semibold text-[#666666]">
                                <p>$14.99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    };

    return (
        <div className='lg:w-[80%] w-[90%] mx-auto py-3'>
            <div className="sm:my-4 my-3 flex items-end justify-between pt-3">
                <h2 className="text-2xl font-semibold">Lớp học nổi bật</h2> 
            </div>
            <div className="pl-3">
                {renderFeatureCourses()}
            </div>
            <PopularCourses />
        </div>
    );
}
