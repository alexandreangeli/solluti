import {
  shallowMount,
} from '@vue/test-utils'
import MyConfirmationDialog from '../../src/components/MyConfirmationDialog.vue'

let wrapper = shallowMount(MyConfirmationDialog)

describe('MyConfirmationDialog', () => {

  let dialogWrapper = wrapper.findComponent({
    ref: 'dialog'
  })
  let titleWrapper = wrapper.findComponent({
    ref: 'title'
  })
  let messageWrapper = wrapper.findComponent({
    ref: 'message'
  })
  let cancelWrapper = wrapper.findComponent({
    ref: 'cancel'
  })
  let agreeWrapper = wrapper.findComponent({
    ref: 'agree'
  })

  let title = "Title"
  let message = "Message"

  it("starts closed", () => {
    expect(dialogWrapper.vm.value).toBe(false)
  })

  it('opens dialog', () => {
    wrapper.vm.open(title, message, {})

    wrapper.vm.$nextTick(() => expect(dialogWrapper.vm.value).toBe(true))
  })

  it('has right title and message', () => {
    wrapper.vm.open(title, message, {})

    expect(titleWrapper.text()).toBe(title)
    expect(messageWrapper.text()).toBe(message)
  })

  it('closes falsy on cancel click', async () => {
    wrapper.vm.$nextTick(() => cancelWrapper.trigger('click'))

    await wrapper.vm.open(title, message, {}).then((value) => {
      expect(value).toBe(false)
      wrapper.vm.$nextTick(() => expect(dialogWrapper.vm.value).toBe(false))
    })
  })

  it('closes truthy on agree click', async () => {
    wrapper.vm.$nextTick(() => agreeWrapper.trigger('click'))

    await wrapper.vm.open(title, message, {}).then((value) => {
      expect(value).toBe(true)
      wrapper.vm.$nextTick(() => expect(dialogWrapper.vm.value).toBe(false))
    })
  })
})