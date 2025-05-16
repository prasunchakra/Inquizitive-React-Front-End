import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'

export default function EndTestConfirm({ open, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogTitle>Submit Test?</DialogTitle>
        <p className="mt-2 text-gray-700">
          Are you sure you want to end the test? You won’t be able to go back.
        </p>
        <DialogFooter className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
