import CodeEditor from '@uiw/react-textarea-code-editor';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSsessionStorage } from '../hooks/SessionStorage';
import M from "materialize-css"





function CreateKata() {
  const initialentry = { name: "", description: "", solution: "", _id: "", Languages: "", participants: "" }
  const [code, setCode] = useState(initialentry);
  const [Katas, setKatas] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);
  const [Land, setLand] = useState("")

  const log = useSsessionStorage("auth-token")

  useEffect(() => {
    getAllKatas()
  }, []);

  //PETICIONES Y CONTROL DE INPUTS
  const sendKata = () => {
    if (code._id) {
      axios.put(`http://localhost:4000/api/katas/${code._id}`, code, {
        headers: { "auth-token": log }
      }).then(response => {
        const { data } = response
        console.log(data)
        //poner advertencia de tarea creada
        M.toast({ html: 'Task Updated' })
        setCode(initialentry)
        getAllKatas();
      })
    } else {
      axios.post("http://localhost:4000/api/katas", code, {
        headers: { "auth-token": log }
      }).then(response => {
        if (response.status === 400) {
          M.toast({ html: 'provide the data required' })
        }
        const { data } = response
        console.log(data)
        //poner advertencia de tarea creada
        M.toast({ html: 'Task Posted' })
        setCode(initialentry)
        getAllKatas();

      })
    }
  }

  const getAllKatas = () => {
    axios.get("http://localhost:4000/api/private", {
      headers: { "auth-token": log }
    })
      .then(response => {
        const { data } = response
        console.log(data)
        setKatas(data);
      })
  }

  const DeleteKata = (id) => {
    if (window.confirm("Are you sure want to delete it?")) {
      axios.delete(`http://localhost:4000/api/katas/${id}`, {
        headers: { "auth-token": log }
      }).then(response => {
        const { data } = response
        console.log(data)
        M.toast({ html: 'Task Deleted' })
        getAllKatas()
      });
    }
    else {
      M.toast({ html: 'Function not executed' })
    }
  }

  const getkataid = (id) => {
    axios.get(`http://localhost:4000/api/katas/${id}`)
      .then(response => {
        const { data } = response
        console.log(data)
        setCode({
          name: data.name,
          description: data.description,
          level: data.level,
          stars: data.stars,
          solution: data.solution,
          Languages: data.Languages,
          _id: data._id

        })
      })
  }

  const posted = () => {
    setCode(initialentry)
  }

  const onsubmit = (e) => {
    e.prevent.default()
  }

  const handelInput = (e) => {
    const { name, value } = e.target;
    setCode({ ...code, [name]: value })
  }
  ///

  //FILTRADO Y PAGINADO DE LAS Katas
  const filteredKatas = () => {
    if (Land.length === 0)
      return Katas.slice(currentPage, currentPage + 1);

    // Si hay algo en la caja de texto
    const filtered = Katas.filter(kata => kata.Languages.includes(Land));
    return filtered.slice(currentPage, currentPage + 1);
  }


  const nextPage = () => {
    if (Katas.filter(kata => kata.Languages.includes(Land)).length > currentPage + 1)
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
        <nav className=" blue-grey darken-3">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Create the Katas</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={onsubmit} action="#">
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name='name' value={code.name} required type="text" placeholder="Kata's Title" autoFocus onChange={handelInput}></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <div data-color-mode="dark">
                          <CodeEditor
                            value={code.description}
                            required
                            name="description"
                            language="js"
                            placeholder="Please enter the kata's task."
                            onChange={handelInput}
                            padding={15}
                            style={{
                              fontSize: 12,
                              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <div data-color-mode="dark">
                          <CodeEditor
                            value={code.solution}
                            required
                            name="solution"
                            language="js"
                            placeholder="Please enter the Solution."
                            onChange={handelInput}
                            padding={15}
                            style={{
                              fontSize: 12,
                              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                          /> </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name='Languages' required value={code.Languages} onChange={handelInput} placeholder="Kata's language"></input>
                      </div>
                    </div>
                    <div>
                      {code._id
                        ? <div><button onClick={sendKata} class="btn waves-effect waves-light" type="submit" name="action">Update
                          <i class="material-icons right">send</i>
                        </button>
                          <button nClick={posted} class="btn waves-effect waves-light" style={{ margin: '4px' }}>
                            Posted
                          </button>
                        </div>

                        :
                        <button onClick={sendKata} class="btn waves-effect waves-light" type="submit" name="action">Create
                          <i class="material-icons right">send</i>
                        </button>
                      }
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
                    <th>Your Katas</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredKatas().map(kata => {
                      return (
                        <tr key={kata._id}>
                          < td > <div class="row">
                            <div class="col s12 ">
                              <div class="card blue-grey darken-1">
                                <div class="card-content white-text">
                                  <span class="card-title">Kata's Description : {kata.name}</span>
                                  <p>Kata to solve : {kata.description}</p>
                                  <p> Kata's Language : {kata.Languages}</p>
                                  <p> Katas's participants : {kata.participants}</p>

                                </div>
                                <div class="card-action">
                                  <td>
                                    <button onClick={() => DeleteKata(kata._id)} className="btn light-blue darken-4">
                                      <i className="material-icons">delete</i>
                                    </button>
                                    <button onClick={() => getkataid(kata._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}>
                                      <i className="material-icons">edit</i>
                                    </button>
                                  </td>
                                </div>
                              </div>
                            </div>
                          </div></td >
                        </tr>
                      )
                    })
                  }
                </tbody>
                <button onClick={prevPage} className="btn light-blue darken-4" style={{ margin: '4px' }}>Previous</button>
                <button onClick={nextPage} className="btn light-blue darken-4">Next</button>
              </table>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}

export default CreateKata





