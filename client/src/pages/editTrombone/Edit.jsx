import React, { useEffect, useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import API from '../../utils/API.js';
import useTromboneEditor from '../../utils/useTromboneEditor';
import Container from '../../components/container/Container';
import UpdateForm from './updateForm/UpdateForm';

export default function EditTrombone() {
    const trombone = useTromboneEditor();
    const history = useHistory();

    const tromboneIdMatch = useRouteMatch('/update/:id');
    const tromboneId = useMemo(() => (tromboneIdMatch ? tromboneIdMatch.params.id : null), [tromboneIdMatch]);

    function getTrombone(id) {
        API.getTrombone(id)
            .then(res => {
                trombone.update({ ...res.data, id: id });
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        // const id = window.location.href.split('/')[4];
        if (tromboneId) {
            getTrombone(tromboneId);
        }
    }, [tromboneId]);

    function handleSubmit(event) {
        event.preventDefault();
        // user must input a maker
        if (trombone.properties.maker.length < 4) {
            alert('The trombone must have a valid maker.');
        } else {
            // remove empty footnotes and images before submitting
            let { footnotes, images } = trombone.properties;
            footnotes = footnotes.filter(footnote => footnote.length > 0);
            images = images.filter(image => image.length > 0);
            if (tromboneId) {
                API.updateTrombone(tromboneId, { ...trombone.properties, footnotes, images })
                    .then(() => {
                        alert('Trombone Updated');
                        history.push('/admin');
                    })
                    .catch(err => console.log(err));
            } else {
                API.addTrombone({ ...trombone.properties, footnotes, images })
                    .then(() => {
                        alert('Trombone Added!');
                        history.push('/admin');
                    })
                    .catch(err => console.log(err));
            }
            trombone.update({ footnotes, images });
        };
    }

    function handleDelete(event) {
        event.preventDefault();
        // simple confirm before permanently deleting item
        if (tromboneId && window.confirm('Are you sure you want to delete this trombone? This action cannot be undone.')) {
            API.deleteTrombone(tromboneId)
                .then(res => {
                    alert('Trombone Permanently Deleted');
                    history.push('/admin');
                })
                .catch(err => console.log(err));
        }
    }

    function imageUpload(event, index) {
        const file = event.target.files[0] || undefined;
        if (file) {
            var reader = new FileReader();
            reader.onloadend = () => {
                const image = reader.result;
                const images = [...trombone.properties.images];
                images[index] = image;
                trombone.update({ images });
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
            reader.readAsDataURL(file);
        }
    }

    function newImage(event) {
        event.preventDefault();
        const images = [...trombone.properties.images];
        images.push('');
        trombone.update({ images });
    }

    function imageDelete(id) {
        const images = [...trombone.properties.images];
        images.splice(id, 1);
        trombone.update({ images });
    }

    function updateFootnote(event, index) {
        const { value } = event.target;
        const footnotes = [...trombone.properties.footnotes];
        footnotes[index] = value;
        trombone.update({ footnotes })
    }

    function newFootnote(event) {
        event.preventDefault();
        const footnotes = [...trombone.properties.footnotes];
        footnotes.push('');
        trombone.update({ footnotes });
    }

    function updateTextField(event) {
        const { id, value } = event.target;
        trombone.update({ [id]: value });
    }

    return (
        <Container>
            <h1>{tromboneId ? 'Update' : 'Create'}!</h1>

            <UpdateForm 
                trombone={trombone.properties}
                updateFootnote={updateFootnote}
                newFootnote={newFootnote}
                imageUpload={imageUpload}
                imageDelete={imageDelete}
                newImage={newImage}
                updateTextField={updateTextField}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                buttonText={tromboneId ? 'Update' : 'Create'}
            />

        </Container>
    );
}
