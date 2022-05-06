import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import M from "materialize-css"



const Home = () => {

    useEffect(() => {
        getkatas()

    }, []);

    const initialentry = {
        name: "",
        description: "",
        solution: "",
        exersiceResult: "",
        participants: "",
        Languages: "",
        _id: "",

    }
    const [Land, setLand] = useState("")
    const [imput, setimput] = useState(initialentry);
    const [Kata, setKata] = useState([]);
    const [currentPage, setcurrentPage] = useState(0);



    //PETICIONES Y CONTROL DE INPUTS
    const sendKata = () => {
        if (imput._id) {
            axios.put(`http://localhost:4000/api/katas/exersice/${imput._id}`, imput)
                .then(async response => {
                    if (response.status === 200) {
                        M.toast({ html: 'Kata handed in' })
                    }
                    if (response.status === 400) {
                        M.toast({ html: 'provide the data required' })
                    }
                })
        }
    }

    const getkatas = () => {
        axios.get("http://localhost:4000/api/katas", {

        })
            .then(response => {
                const { data } = response
                console.log(data)
                setKata(data)
            })
    }

    const getkataid = (id) => {
        axios.get(`http://localhost:4000/api/katas/${id}`)
            .then(response => {
                const { data } = response
                console.log(data)
                setimput({
                    name: data.name,
                    description: data.description,
                    solution: data.solution,
                    _id: data._id
                })

            })
    }

    const handelInput = (e) => {
        const { name, value } = e.target;
        setimput({ ...imput, [name]: value })
    };

    const preventDefault = (e) => {
        e.preventdefault()
    }
    ///


    //FILTRADO DE KATAS Y PAGINACION
    const filteredKatas = () => {
        if (Land.length === 0)
            return Kata.slice(currentPage, currentPage + 1);

        // Si hay algo en la caja de texto
        const filtered = Kata.filter(kata => kata.Languages.includes(Land));
        return filtered.slice(currentPage, currentPage + 1);
    }

    const nextPage = () => {
        if (Kata.filter(kata => kata.Languages.includes(Land)).length > currentPage + 1)
            setcurrentPage(currentPage + 1);
    }
    const prevPage = () => {
        if (currentPage > 0)
            setcurrentPage(currentPage - 1);
    }

    const onSearchChange = (e) => {
        setcurrentPage(0);
        setLand(e.target.value);
    }
    ///

    return (

        <div>
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#" className="brand-logo">MERN Stack</a>
                        </div>
                    </div>
                </nav>
                <div className="container ">
                    <div className="row">
                        <div className="col s5 ">
                            <div className="card ">
                                <div className="card-content">
                                    <form onSubmit={preventDefault}>
                                        <div className="row">
                                            <div className="input-field col s10 white">
                                                <textarea rows="10" onChange={handelInput} name="name" value={imput.name} readonly="readonly" type="text" placeholder="Kata's description" autoFocus required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div>Select a Kata on your right and solve it</div>
                                            <div data-color-mode="dark">
                                                <CodeEditor
                                                    value={imput.description}
                                                    name="description"
                                                    language="js"
                                                    placeholder=" This is the kata to solve"
                                                    onChange={handelInput}
                                                    required
                                                    padding={15}
                                                    readonly="readonly"
                                                    style={{
                                                        fontSize: 12,
                                                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div>Solve the Kata</div>
                                            <div data-color-mode="dark">
                                                <CodeEditor
                                                    value={imput.exersiceResult}
                                                    name="exersiceResult"
                                                    language="js"
                                                    placeholder="Solve Kata"
                                                    onChange={handelInput}
                                                    required
                                                    padding={15}
                                                    style={{
                                                        fontSize: 12,
                                                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {
                                            imput.participants ?

                                                <div className="row">
                                                    <div>Solution</div>
                                                    <div data-color-mode="dark">
                                                        <CodeEditor
                                                            value={imput.solution}
                                                            name="solution"
                                                            language="js"
                                                            placeholder="This is the solution"
                                                            onChange={handelInput}
                                                            required
                                                            padding={15}
                                                            style={{
                                                                fontSize: 12,
                                                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                                            }}
                                                        />
                                                    </div>
                                                </div> : null
                                        }
                                        <div className="row">
                                            <div className="input-field col s8 white">
                                                <input onChange={handelInput} name="participants" value={imput.participants} type="text" placeholder="Your name Please" autoFocus required />
                                            </div>
                                        </div>

                                        <div>
                                            <button onClick={sendKata} className="btn light-blue darken-4"> send </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <div className="input-field col s12"  >
                                <input value={Land} onChange={onSearchChange} placeholder='Search Languages for the katas' />
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Katas to Solve</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredKatas().map(kata => {
                                            return (
                                                <tr key={kata._id}>
                                                    <td><div class="row">
                                                        <div class="col s12 ">
                                                            <div class="card blue-grey darken-1">
                                                                <div class="card-content white-text">
                                                                    <span class="card-title"> Kata's description: {kata.name}</span>
                                                                    <p>Problem to solve : {kata.description}</p>
                                                                    <p> Kata's Language  : {kata.Languages}</p>
                                                                    <p> Kata's Participants  : {kata.participants} </p>
                                                                </div>
                                                                <div class="card-action">
                                                                    <button onClick={() => getkataid(kata._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}>
                                                                        Solve Kata
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                <button onClick={prevPage} className="btn light-blue darken-4" style={{ margin: '4px' }}>Previous</button>
                                <button onClick={nextPage} className="btn light-blue darken-4">Next</button>
                            </table>
                        </div >
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;












