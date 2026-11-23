"""Creator: <dinesh_blend360_india> <dinesh.marre@blend360.com>.

Drop-in Streamlit wrapper for the transparent Blend logo animation.
"""

from pathlib import Path

import streamlit as st


def show_blend_logo(height: int = 220) -> None:
    """Show the looping logo in a transparent iframe."""
    if height <= 0:
        raise ValueError("height must be positive")

    html_file = Path(__file__).with_name("index.html")
    iframe = getattr(st, "iframe", None)
    if callable(iframe):
        iframe(html_file, height=height)
        return

    # Streamlit versions before st.iframe use the older HTML component.
    import streamlit.components.v1 as components

    components.html(
        html_file.read_text(encoding="utf-8"),
        height=height,
        scrolling=False,
    )


__all__ = ["show_blend_logo"]
