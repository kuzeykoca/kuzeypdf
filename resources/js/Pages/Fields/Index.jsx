import {useState} from "react"
import {Head, Link, router, useForm} from "@inertiajs/react"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {DragDropContext, Droppable, Draggable} from "@hello-pangea/dnd"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import Modal from "@/Components/Modal.jsx"
import InputLabel from "@/Components/InputLabel.jsx"
import TextInput from "@/Components/TextInput.jsx"
import SecondaryButton from "@/Components/SecondaryButton.jsx"
import SuccessButton from "@/Components/SuccessButton.jsx"
import {Transition} from "@headlessui/react";
import { FaRegTrashAlt } from "react-icons/fa";


export default function Index({fields = []}) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        fields
    })
    const [show, setShow] = useState(false)
    const [name, setName] = useState("")

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }

    const onDragEnd = (result) => {
        if (!result.destination) return
        if (result.destination.index === result.source.index) return

        const reorderedItems = reorder(
            data.fields,
            result.source.index,
            result.destination.index
        )

        const updatedItems = reorderedItems.map((item, index) => ({
            ...item,
            order: index + 1,
        }))

        setData('fields', updatedItems)
    }

    const submit = (e) => {
        e.preventDefault()

        router.post(route('fields.store'), {'value': name}, {
            onFinish: () => {
                router.visit(route('fields.index'));
            }
        })
    }

    const updateOrders = () => {
        post(route('fields.update'))
    }

    return (
        <AuthenticatedLayout>
            <Head title="Fields"/>
            <div className="pt-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-5 flex justify-end">
                        <PrimaryButton onClick={() => setShow(true)}>
                            Add new field
                        </PrimaryButton>
                        <SuccessButton disabled={processing} className="ms-4" onClick={updateOrders}>
                            Save
                        </SuccessButton>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0">
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="list">
                            {provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {
                                        data.fields.map((item, index) => <Quote item={item} index={index} key={item.id}/>)
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
            <Modal onClose={() => setShow(false)} show={show} maxWidth="md">
                <h1 className="p-5 pb-2 border-b text-center text-md text-gray-600">
                    Create a new field
                </h1>
                <form onSubmit={submit} className="pb-5">
                    <div className="p-5">
                        <InputLabel htmlFor="name" value="Field name"/>

                        <TextInput
                            id="name"
                            type="text"
                            value={name}
                            placeholder="Test Field:"
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-between px-5">
                        <SecondaryButton onClick={()=>setShow(false)}>
                            Close
                        </SecondaryButton>
                        <PrimaryButton className="ms-4">
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    )
}

function Quote({item, index}) {
    const deleteThis = () => {
        router.delete(route('fields.delete'), {
            data: { field_id: item.id },
            onFinish: () => {
                router.visit(route('fields.index'));
            }
        })
    }

    return (
        <Draggable draggableId={`item-${item.id}`} index={index}>
            {provided => (
                <div
                    className="p-5 bg-gray-100 my-4 shadow-lg rounded-lg border-2 border-blue-300 relative"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <span className="absolute pe-2 left-2 text-xl text-gray-400 border-e">
                        {item.order}
                    </span>
                    <span className="ps-7 z-10">
                        {item.value}
                    </span>
                    <div className="absolute right-2 bottom-2 z-50 cursor-default" onClick={deleteThis}>
                        <FaRegTrashAlt color="#FF8356"/>
                    </div>
                </div>
            )}
        </Draggable>
    )
}
