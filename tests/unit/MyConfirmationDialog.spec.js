import {
  shallowMount,
} from '@vue/test-utils'
import MyConfirmationDialog from '../../src/components/MyConfirmationDialog.vue'

let wrapper = shallowMount(MyConfirmationDialog)

describe('MyConfirmationDialog', () => {

  let dialogWrapper = wrapper.findComponent({
    ref: 'dialog'
  })

  it("starts closed", () => {
    expect(dialogWrapper.vm.value).toBe(false)
  })

  it('opens dialog', () => {
    wrapper.vm.open("Title", "Message", {})

    wrapper.vm.$nextTick(() => expect(dialogWrapper.vm.value).toBe(true))
  })

  it('has right title and message', () => {
    wrapper.vm.open("Title", "Message", {})

    expect(wrapper.vm.title).toBe('Title')
    expect(wrapper.vm.message).toBe('Message')
  })

  it('closes falsy on cancel click', async () => {
    setTimeout(() => {
      let cancelWrapper = wrapper.findComponent({
        ref: 'cancel'
      })

      cancelWrapper.trigger('click')
    }, 0.1)

    await wrapper.vm.open("Title", "Message", {}).then((value) => {
      expect(value).toBe(false)
      wrapper.vm.$nextTick(() => expect(dialogWrapper.vm.value).toBe(false))
    })
  })

  it('closes truthy on agree click', async () => {
    setTimeout(() => {
      let cancelWrapper = wrapper.findComponent({
        ref: 'agree'
      })

      cancelWrapper.trigger('click')
    }, 0.1)

    await wrapper.vm.open("Title", "Message", {}).then((value) => {
      expect(value).toBe(true)
      wrapper.vm.$nextTick(() => expect(dialogWrapper.vm.value).toBe(false))
    })
  })


  // it('has right title and message', () => {})


  // it('sets the correct default data', () => {
  //   expect(typeof MyConfirmationDialog.data).toBe('function')
  //   const defaultData = MyConfirmationDialog.data()
  //   expect(defaultData.message).toBe('hello!')
  // })

  // it('correctly sets the message when created', () => {
  //   expect(wrapper.vm.$data.message).toBe('bye!')
  // })

  // it('renders the correct message', () => {
  //   expect(wrapper.text()).toBe('bye!')
  // })
})