import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState } from "react";
import { TbBrandBlogger } from "react-icons/tb";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";


export default function contacts() {

    const [curretPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQyery, setSearchQuery] = useState('');

    // Fetch blog data
    const { alldata, loading } = useFetchData('/api/contacts');

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const allblog = alldata.length;

    // Filter all data based on search query
    const filteredBlogs = searchQyery.trim() === ''
        ? alldata
        : alldata.filter(blog => blog.title.toLowerCase().includes(searchQyery.toLowerCase()));

    const indexOfFirstBlog = (curretPage - 1) * perPage;
    const indexOfLastblog = curretPage * perPage;

    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastblog);
    const publishedblogs = currentBlogs;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h1>All Published <span>contacts</span></h1>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <TbBrandBlogger /> <span>/</span> <span>contacts</span>
                    </div>
                </div>

                <div className="blogstable">
                    <div className="flex gap-2 mb-1">
                        <h2>Search contacts :</h2>
                        <input
                            type="text"
                            placeholder="Search By Title..."
                            value={searchQyery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <table className="table rtable-styling">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Email</th>
                                <th>Phone no</th>
                                <th>Project</th>
                                <th>Open Contact</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td>
                                        <Dataloading />
                                    </td>
                                </tr>
                            ) : (
                                publishedblogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center">No contacts found</td>
                                    </tr>
                                ) : (
                                    publishedblogs.map((blog, index) => (
                                       
                                        <tr key={blog._id}>
                                            <td>{indexOfFirstBlog + index + 1}</td>
                                            <td><h3>{blog.name}</h3></td>
                                            <td><h3>{blog.email}</h3></td>
                                            <td><h3>{blog.phone}</h3></td>
                                            <td><h3>{blog.project[0]}</h3></td>
                                            <td><h3>{blog.title}</h3></td>
                                            <td>
                                                <div className="flex gap-2 flex-center">
                                                    <Link href={'/contact/view' + blog._id}>
                                                 
                                                        <button><FaRegEye /></button>
                                                    </Link>
    
                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                )
                            )}
                        </tbody>
                    </table>
                                {/* Pagination */}
                    {publishedblogs.length === 0 ? ( " ") : (
                        <div className="blogpagination">
                                      <button onClick={() => paginate(curretPage - 1)} disabled={curretPage === 1}>previous</button>
                         {pageNumbers.slice(Math.max(curretPage - 3, 0), Math.min(curretPage + 2, pageNumbers.length)).map(number => {
                            <button key={number}
                            onClick={() => paginate(number)}
                            className={`${curretPage === number ? 'active' : ''}`}
                            >
                                {number}
                            </button>
                         })}
                         <button onClick={() => paginate(curretPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                        </div>
               )}

                </div>
            </div>
        </>
    );
}
